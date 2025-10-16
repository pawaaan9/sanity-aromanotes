const accord = {
  name: 'accord',
  title: 'Main Accord',
  type: 'object',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'color', title: 'Color', type: 'color'},
    {name: 'percentage', title: 'Percentage', type: 'number', validation: (Rule: any) => Rule.min(0).max(100)}
  ],
  preview: {
    select: {title: 'name', percentage: 'percentage'},
    prepare({title, percentage}: any) {
      return {title, subtitle: `${percentage ?? 0}%`}
    }
  }
}

export default accord


