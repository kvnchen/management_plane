'use client';

import { useState } from 'react';
import List from 'components/list/list';
import styles from './styles.module.css';
import { Environment, Channel } from 'interfaces/interfaces';

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
  
  function nextButtonDisabled(): boolean {
    if (step === ENVIRONMENT)
      return env === null;
    else if (step === CHANNELS)
      return channels === null;

    return false;
  }

  return (
    <div className={styles.wizard}>
      {/* testing */}
      {env && (
        <p>
          {env.title}
        </p>
      )}

      <List 
        step={ENVIRONMENT} 
        set={setEnv} 
        path={'http://localhost:3000/api/environments'}
        mode='one'
        isDisabled={step !== ENVIRONMENT}
      />

      {step === CHANNELS && env !== null && (
        <List 
          step={CHANNELS} 
          set={setChannels} 
          path={`http://localhost:3000/api/environments/${env.id}/channels`}
          mode='many'
          isDisabled={step !== CHANNELS}
        />
      )}

      <div className={styles['button-row']}>
        {step > 0 && (
          <button
            onClick={() => {
              if (step === CHANNELS)
                setChannels(null);
              // else if (step === MESSAGES)

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
