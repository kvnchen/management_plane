'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import List from 'components/list/list';
import Composer from 'components/composer/composer';
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
  const [document, setDocument] = useState<string>('');
  
  function nextButtonDisabled(): boolean {
    if (step === ENVIRONMENT)
      return env === null;
    else if (step === CHANNELS)
      return channels === null;
    else if (step === MESSAGES)
      return messages === null;

    return false;
  }

  function formatChannelIds(): string {
    return (channels as Channel[]).map((c) => c.id).join(',');
  }

  return (
    <div className={styles.wizard}>
      <h1>AsyncAPI Document Generator</h1>
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

      {step >= MESSAGES && env !== null && channels !== null && (
        <List 
          step={MESSAGES} 
          set={setMessages} 
          path={`http://localhost:3000/api/environments/${env.id}/channels/messages?channelIds=${formatChannelIds()}`}
          mode='many'
          isDisabled={step !== MESSAGES}
        />
      )}

      {step === EDITING && env !== null && channels !== null && messages !== null && (
        <Composer env={env} channels={channels} messages={messages} dispatch={setDocument} />
      )}

      <div className={styles['button-row']}>
        {step > ENVIRONMENT && (
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

        {step < EDITING && (
          <button
            disabled={nextButtonDisabled()}
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        )}

        {step === EDITING && (
          <button
            onClick={async () => {
              const res = await fetch('http://localhost:3000/api/documents', {
                method: 'POST',
                body: JSON.stringify({
                  document: document
                })
              });
              const parsed = await res.json();
              console.log(parsed);
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  )
}
