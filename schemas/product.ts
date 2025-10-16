import AccordsChartInput from '../components/AccordsChartInput'

const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Product Brand',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'variants',
      title: 'Product Types / Variants',
      description: 'Add sizes (100ml, 50ml, 10ml decant) with photo, price, discount',
      type: 'array',
      of: [{type: 'productVariant'}],
      validation: (Rule: any) => Rule.min(1),
    },
    {
      name: 'mainAccords',
      title: 'Main Accords',
      type: 'array',
      of: [{type: 'accord'}],
      components: {
        input: AccordsChartInput,
      },
      validation: (Rule: any) => Rule.unique().max(12),
    },
    {
      name: 'coverImage',
      title: 'Product Cover Photo',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          {title: 'Male', value: 'male'},
          {title: 'Female', value: 'female'},
          {title: 'Unisex', value: 'unisex'},
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'perfumeType',
      title: 'Perfume Type',
      type: 'string',
      options: {
        list: [
          {title: 'YB Originals', value: 'originals'},
          {title: 'Inspired', value: 'inspired'},
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
      gender: 'gender',
      perfumeType: 'perfumeType',
    },
    prepare({title, media, gender, perfumeType}: any) {
      const genderLabel = gender ? gender[0].toUpperCase() + gender.slice(1) : ''
      const typeLabel = perfumeType === 'originals' ? 'YB Originals' : 'Inspired'
      return {
        title,
        media,
        subtitle: [typeLabel, genderLabel].filter(Boolean).join(' • '),
      }
    },
  },
  orderings: [
    {
      title: 'Name, A→Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
}

export default product


