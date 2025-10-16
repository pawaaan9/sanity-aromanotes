const productVariant = {
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: '100ml', value: '100ml'},
          {title: '50ml', value: '50ml'},
          {title: '10ml (decant)', value: '10ml (decant)'}
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true}
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).custom((discount: number, ctx: any) => {
        const price = ctx.parent?.price
        if (discount == null || price == null) return true
        return discount <= price || 'Discount price cannot exceed price'
      }),
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {title: 'size', media: 'photo', price: 'price', discountPrice: 'discountPrice'},
    prepare({title, media, price, discountPrice}: any) {
      const toRs = (v: number | null | undefined) => {
        try {
          return new Intl.NumberFormat('en-LK', {style: 'currency', currency: 'LKR', minimumFractionDigits: 0}).format(v ?? 0)
        } catch {
          const n = Math.round(Number(v || 0))
          return `Rs ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
        }
      }
      const subtitle = discountPrice != null ? `${toRs(discountPrice)} (${toRs(price)})` : `${toRs(price)}`
      return {title, media, subtitle}
    }
  }
}

export default productVariant


