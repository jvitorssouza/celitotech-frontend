export const fieldsMetadata = [
  { id: '1', label: 'Title', value: 'title', fieldType: 'text', required: true },
  { id: '2', label: 'Summary for Changes', value: 'summaryForChanges', fieldType: 'textarea', required: true },
  { id: '3', label: 'Reason for Changes', value: 'reasonForChanges', fieldType: 'textarea', required: true },
  { id: '4', label: 'Is the Document Revision a Pre-Approved Document?', value: 'isPreApproved', fieldType: 'select', options: [
      { text: 'Yes', value: 'Yes' },
      { text: 'No', value: 'No' }
    ], required: true },
  { id: '5', label: 'Follow-Up Comment', value: 'followUpComment', fieldType: 'textarea', required: false },
  { id: '6', label: 'Check-in Comment', value: 'checkInComment', fieldType: 'textarea', required: false },
];