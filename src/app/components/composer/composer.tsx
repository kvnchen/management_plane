'use client';
import styles from './styles.module.css';
import { Environment, Channel, Message } from 'interfaces/interfaces';
import { useState } from 'react';

export default function Composer({ env, channels, messages }: {
  env: Environment,
  channels: Channel[],
  messages: Message[]
}) {
  function generateDocument(): string {
    const fragments: string[] = [];

    fragments.push('asyncapi: 3.0.0');
    fragments.push('info:');
    fragments.push(`  title: ${env.title}`);
    fragments.push(`  version: '${env.version}'`);
    
    fragments.push('channels:');
    for (const channel of channels) {
      fragments.push(`  ${channel.name}:`);
      fragments.push(`    address: '${channel.address}'`);

      const channelMessages = messages.filter((m) => m.channel_id === channel.id);
      if (channelMessages.length > 0) {
        fragments.push(`    messages:`);
        for (const m of channelMessages) {
          fragments.push(`      ${m.name}:`);
          fragments.push(`        payload:`);
          fragments.push(`          type: ${m.payload.type}`);
          fragments.push(`          pattern: '${m.payload.pattern}'`);
        }
      }
    }

    return fragments.join('\n');
  }

  const [contents, setContents] = useState<string>(generateDocument());


  return (
    <div className={styles.composer}>
      <h2>Editing</h2>
      {/* <p>Environment: {env.title}</p>
      <p>
        Channels: {channels.map((channel, index) => <span key={index}>{channel.name}</span>)}
      </p>
      <p>
        Messages: {messages.map((channel, index) => <span key={index}>{channel.name}</span>)}
      </p> */}
      <textarea
        id='editor'
        className={styles.editor} 
        value={contents} 
        onChange={(e) => setContents(e.target.value)}
      />
    </div>
  )
}