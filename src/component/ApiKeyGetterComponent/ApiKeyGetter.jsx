// components/ApiKeyGetter.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_telgram_bot_status } from '../../Redux/BotSlice/BotSlice';

const ApiKeyGetter = ({ name }) => {
  const storeKey = () => {
    dispatch(get_telgram_bot_status({ key: botKey, serviceName: 'telegram' }));
    console.log(botState); // This will show the telegram slice of state
  };
  const botState = useSelector(state => state.telegram); // Accessing the telegram slice of state
  const [botKey, setKey] = useState('');
  const dispatch = useDispatch();



  return (
    <div>
      <div><h1>Please Enter Your Telegram Api key</h1></div>
      <div>
        <input
          type="text"
          id="number"
          placeholder="Enter Your Number"
          value={botKey}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div><button onClick={storeKey}>Get Api Key</button></div>
    </div>
  );
};

export default ApiKeyGetter;
