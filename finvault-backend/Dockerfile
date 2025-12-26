# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cache layer)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Verify the JAR was created
RUN ls -la /app/target/ && echo "Build complete!"

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the JAR file
COPY --from=build /app/target/finvault-backend.jar /app/app.jar

# Verify the JAR exists
RUN ls -la /app/ && echo "JAR copied successfully!"

EXPOSE 8080

# Use shell form to ensure proper execution
CMD ["java", "-jar", "/app/app.jar"]
