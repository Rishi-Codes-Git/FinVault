import React from 'react';


export default function Home(){
return (
<div className="hero glass text-center p-5 mt-4">
<h1 className="display-5 fw-bold">Welcome to FinVault</h1>
<p className="mt-3">Your secure digital banking vault built with Spring Boot & React.</p>
<img src="/assets/images/hero-bank.png" alt="bank" style={{width: '260px'}} className="mt-4" />
</div>
);
}