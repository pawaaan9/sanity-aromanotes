import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'aroma-notes-studio',
  title: 'Aroma Notes Studio',
  projectId: 'ief0s3av',
  dataset: 'production',
  plugins: [deskTool(), visionTool(), colorInput()],
  schema: {
    types: schemaTypes,
  },
})


