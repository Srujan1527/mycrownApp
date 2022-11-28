import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// this logger is essentially something that allows us to see what the state looks like before an action is dispatched , what the action is,and then how the state in turn , looks after the action. In order to do that ,we actually need to create a thing called MIDDLEWARES
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//middleware is kind of like little library helpers that run before an action hits the reducer. so whenever you dispatch an action before that action hits the reducers , it hits the middleware first

const middleWares = [logger];

//in order to use these middlewares to actually work , we have to call applyMiddleware so these middleware are like enhancers. So in order for this to work , you have to generate it using compose method with applyMiddleware method like below

const composeEnhancers = compose(applyMiddleware(...middleWares));

// in order to pass the middlware to the configureStore we actually need to pass it as a third argument and the second argument is if you wanna add any additional default state here this is added so that we can make it easier to test
export const store = configureStore({ reducer: rootReducer });
