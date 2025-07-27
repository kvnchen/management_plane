'use client';

import { useState } from 'react';
import List from 'components/list/list';
import styles from './styles.module.css';
import { Environment, Channel, Message } from 'interfaces/interfaces';

// Steps
const ENVIRONMENT = 0;
const CHANNELS = 1;
const MESSAGES = 2;
const EDITING = 3;

// Manages state for the current step
export default function Wizard() {
  const [step, setStep] = useState<number>(ENVIRONMENT);
  const [env, setEnv] = useState<Environment | null>(null);
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  
  function nextButtonDisabled(): boolean {
    if (step === ENVIRONMENT)
      return env === null;
    else if (step === CHANNELS)
      return channels === null;
    else if (step === MESSAGES)
      return messages === null;

    return false;
  }

  return (
    <div className={styles.wizard}>
      {/* testing */}
      {env && (
        <p>
          Env: {env.title}
        </p>
      )}
      {channels && (
        <p>
          Channels: {channels.map((channel, index) => <span key={index}>{channel.name}</span>)}
        </p>
      )}
      {messages && (
        <p>
          Messages: {messages.map((channel, index) => <span key={index}>{channel.name}</span>)}
        </p>
      )}

      <List 
        step={ENVIRONMENT} 
        set={setEnv} 
        path={'http://localhost:3000/api/environments'}
        mode='one'
        isDisabled={step !== ENVIRONMENT}
      />

      {step >= CHANNELS && env !== null && (
        <List 
          step={CHANNELS} 
          set={setChannels} 
          path={`http://localhost:3000/api/environments/${env.id}/channels`}
          mode='many'
          isDisabled={step !== CHANNELS}
        />
      )}

      {step >= MESSAGES && env !== null && (
        <List 
          step={MESSAGES} 
          set={setMessages} 
          path={`http://localhost:3000/api/environments/${env.id}/channels/messages`}
          mode='many'
          isDisabled={step !== MESSAGES}
        />
      )}

      <div className={styles['button-row']}>
        {step > 0 && (
          <button
            onClick={() => {
              if (step === CHANNELS)
                setChannels(null);
              else if (step === MESSAGES)
                setMessages(null);

              setStep(step - 1);
            }}
          >
            Prev
          </button>
        )}

        <button
          disabled={nextButtonDisabled()}
          onClick={() => setStep(step + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
