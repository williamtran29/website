export const getEmail = ({ from, subject, name, company, phone, message }) => ({
  from,
  to: 'contact@smooth-code.com',
  subject,
  textContent: `
${subject}

-----

Nom: ${name}

Société: ${company}

Email: ${from}

Téléphone: ${phone}

-----

${message}
`,
})
