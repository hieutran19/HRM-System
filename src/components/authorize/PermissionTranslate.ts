export const rolePermissions: Record<string, { permission: string; requiresCondition?: boolean }[]> = {
  role_hris_HR: [
    { permission: 'read_employee' },
    { permission: 'update_employee', requiresCondition: true },
    { permission: 'create_education', requiresCondition: true  },
    { permission: 'read_education' },
    { permission: 'update_education' },
    { permission: 'delete_education' },
    { permission: 'create_contract', requiresCondition: true },
    { permission: 'read_contract' },
    { permission: 'read_contract_draft' },
    { permission: 'create_university' },
    { permission: 'read_university' },
    { permission: 'read_events' }
  ],
  role_hris_HOD: [
    { permission: 'read_employee' },
    { permission: 'create_education', requiresCondition: true },
    { permission: 'read_education' },
    { permission: 'update_education' },
    { permission: 'delete_education' },
    { permission: 'create_contract', requiresCondition: true },
    { permission: 'read_contract' },
    { permission: 'read_university' },
    { permission: 'read_events' } 
  ],
  role_CEO: [
    { permission: 'read_employee' },
    { permission: 'update_employee' },
    { permission: 'read_education' },
    { permission: 'update_education' },
    { permission: 'read_contract' },
    { permission: 'read_contract_all' },
    { permission: 'create_university' },
    { permission: 'read_university' },
    { permission: 'read_events' },
    { permission: 'generate_payslip' } 
  ]
};
