'use client';

import { useState } from 'react';
import List from 'components/list/list';
import styles from './styles.module.css';

// Steps
const ENVIRONMENT = 0;
const CHANNELS = 1;
const MESSAGES = 2;
const EDITING = 3;

// Manages state for the current step
export default function Wizard() {
  const [step, setStep] = useState<number>(ENVIRONMENT);
  const [env, setEnv] = useState<string | null>(null);
  
  function nextButtonState(): boolean {

    return true;
  }

  return (
    <div className={styles.wizard}>
      <List 
        step={ENVIRONMENT} 
        set={setEnv} 
        path={'http://localhost:3000/api/environments'} 
      />
      <div className={styles['button-row']}>
        {step > 0 && (<button
          disabled={true}
          onClick={() => setStep(step + 1)}
        >Prev</button>)}
        <button
          disabled={nextButtonState()}
          onClick={() => setStep(step + 1)}
        >Next</button>
      </div>
    </div>
  )
}
