import React from 'react';
import { useEffect } from "react";
import Api from './components/UniApi/api';
import Tokenprice from './components/UniApi/tokenprice';
import { ApolloProvider } from "@apollo/client";
import { client } from './components/UniApi/tokenprice';


const About = () => {
	
return (
	<div>
	<div
	style={{
		display: 'flex',
		justifyContent: 'Right',
		alignItems: 'Right',
		height: '100vh'
	}}
	>
	<h1>GeeksforGeeks is a Computer Science portal for geeks.<br></br></h1>
	</div>
	<div>
	{<br></br>}
    {/*<Api/>*/}
	<ApolloProvider client={client}>
	
    <Tokenprice/>
  </ApolloProvider>
  </div>
  </div>
);
};

export default About;
