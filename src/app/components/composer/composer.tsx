'use client';
import styles from './styles.module.css';
import { Environment, Channel, Message } from 'interfaces/interfaces';
import { useState, useEffect } from 'react';

export default function Composer({ env, channels, messages, dispatch }: {
  env: Environment,
  channels: Channel[],
  messages: Message[],
  dispatch: Function
}) {
  useEffect(() => {
    window.scroll({
        top: (document.getElementById('composer-3') as HTMLElement).getBoundingClientRect().y + window.scrollY,
        behavior: 'smooth'
      });
  }, []);

  function generateContents(): string {
    const fragments: string[] = [];

    fragments.push('asyncapi: 3.0.0');
    fragments.push('info:');
    fragments.push(`  title: ${env.title}`);
    fragments.push(`  version: '${env.version}'`);
    if (env.description)
      fragments.push(`  description: '${env.description}'`);

    if (env.servers.length > 0) {
      fragments.push('servers:');

      for (const server of env.servers) {
        fragments.push(`  ${server.name}:`);
        fragments.push(`    host: ${server.name}`);
        fragments.push(`    protocol: ${server.protocol}`);
        if (server.description)
          fragments.push(`    description: ${server.description}`);
      }
    }
    
    fragments.push('channels:');
    for (const channel of channels) {
      fragments.push(`  ${channel.name}:`);
      fragments.push(`    address: '${channel.address}'`);
      if (channel.description)
        fragments.push(`    description: '${channel.description}'`);

      const channelMessages = messages.filter((m) => m.channel_id === channel.id);
      if (channelMessages.length > 0) {
        fragments.push(`    messages:`);
        for (const m of channelMessages) {
          fragments.push(`      ${m.name}:`);
          fragments.push(`        payload:`);
          fragments.push(`          type: ${m.payload.type}`);
          
          // payload can be any shape, need to dynamically unfurl obj properties
          if (m.payload.type === 'string')
            fragments.push(`          pattern: '${m.payload.pattern}'`);
          else if (m.payload.type === 'object') {
            fragments.push(`          properties:`);
            for (const key of Object.keys(m.payload.properties)) {
              fragments.push(`            ${key}:`);
              fragments.push(`              type: ${m.payload.properties[key].type}`);
              if (m.payload.properties[key].description)
                fragments.push(`              description: ${m.payload.properties[key].description}`);
            }
          }
        }
      }
    }

    return fragments.join('\n');
  }
  const [contents, setContents] = useState<string>(generateContents());

  useEffect(() => {
    dispatch(contents);
  }, [contents]);

  return (
    <article id={`composer-3`} className={styles.composer}>
      <h2>Editing</h2>
      <textarea
        id='editor'
        className={styles.editor} 
        autoCorrect='off'
        value={contents} 
        onChange={(e) => {
          setContents(e.target.value);
        }}
      />
    </article>
  )
}