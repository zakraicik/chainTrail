# chainTrail

![Ethereum Block Explorer](./public/appPreview.png)

**chainTrail** is a prototype block explorer designed to visualize the Ethereum blockchain in its true form—as a chain. Each item in the chain represents a block, and each block is clickable. When a block is clicked, the UI displays detailed information about the block and visualizes the transactions within it. Hovering over the transaction plot reveals a tooltip with additional information about each transaction, providing an interactive and informative experience for users. Chaintrail is built on top of the Alchemy SDK. As a prototype, it showcases key features and skills but is not intended for production use.

## Running chainTrail

chainTrail is just a prototype built for fun. Consequently, I am not going to deploy the app and rack up a huge usage charge. For that reason, to run chainTrail take the following steps

1. Get a [Alchemy API key](https://dashboard.alchemy.com/signup/?a=fantom-opera)
2. Clone repo
3. Create `.env` file in the root directory and store API key in format `REACT_APP_ALCHEMY_API_KEY=<your API Key Here>`
4. Run `npm install`
5. Run `npm start`

As a disclaimer, I am not a web designer; I am a data scientist! Therefore, some of the CSS may not be perfect (not super responsive, won't work on mobile, etc)

## Skills Demonstrated

1. **External API Interaction**: The project demonstrates the ability to interact with external APIs. In this case, we interact with the external API to fetch realtime blockchain data. We set up event listeners to update the chain each time a new block is created. The implementation shows an understanding of how to efficiently manage API calls to avoid unnecessary requests and reduce load times.
2. **Handling Complex Data**: The data returned by the API is often in complex data structures, such as JSON objects and list of lists. This project showcases my ability to extract and present relevant information. Specifically, It demonstrates the ability to process and transform raw blockchain data into a user-friendly format for visualization and analysis.
3. **Front End Development**: The user interface is built in react. Although I'm a data scientist, it showcases my familiarity with front end development frameworks.
