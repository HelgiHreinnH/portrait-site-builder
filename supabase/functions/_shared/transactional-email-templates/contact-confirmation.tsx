import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Helgi Hreinn Hjálmarsson"

interface ContactConfirmationProps {
  name?: string
}

const ContactConfirmationEmail = ({ name }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out — I'll get back to you soon</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thank you, ${name}.` : 'Thank you for reaching out.'}
        </Heading>
        <Text style={text}>
          I've received your message and will get back to you as soon as possible.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          {SITE_NAME} · Architect · Copenhagen
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Thanks for reaching out',
  displayName: 'Contact confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Space Grotesk', Arial, sans-serif" }
const container = { padding: '40px 25px' }
const h1 = { fontSize: '24px', fontWeight: '700', color: 'hsl(220, 40%, 13%)', margin: '0 0 20px', letterSpacing: '-0.02em' }
const text = { fontSize: '15px', color: 'hsl(220, 10%, 46%)', lineHeight: '1.6', margin: '0 0 25px' }
const hr = { borderColor: 'hsl(0, 0%, 92%)', margin: '30px 0' }
const footer = { fontSize: '12px', color: 'hsl(220, 10%, 46%)', margin: '0', letterSpacing: '0.05em' }
