import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'eizijesu/tinkbyte-site', // Your actual project identifier
  },
  ui: {
    brand: {
      name: 'TinkByte CMS',
    },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ 
          label: 'Description',
          multiline: true,
        }),
        pubDate: fields.date({ 
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/media',
          publicPath: '/media/',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { 
            label: 'Tags',
            itemLabel: (props: any) => props.value || 'Tag',
          }
        ),
        draft: fields.checkbox({ 
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          links: true,
          dividers: true,
          images: {
            directory: 'public/media',
            publicPath: '/media/',
          },
        }),
      },
    }),
    audio: collection({
      label: 'Audio Content',
      slugField: 'title',
      path: 'src/content/audio/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ 
          label: 'Description',
          multiline: true,
        }),
        pubDate: fields.date({ 
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        audioFile: fields.text({ 
          label: 'Audio File Path',
          description: 'e.g., /media/episode-1.mp3',
        }),
        duration: fields.text({ 
          label: 'Duration',
          description: 'e.g., 25:30',
        }),
        episode: fields.integer({ 
          label: 'Episode Number',
          validation: { min: 1 },
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { 
            label: 'Tags',
            itemLabel: (props: any) => props.value || 'Tag',
          }
        ),
        draft: fields.checkbox({ 
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.document({
          label: 'Show Notes',
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});
