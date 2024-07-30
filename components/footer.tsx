import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full bg-muted/50 text-center py-4'>
      <p className='text-sm text-muted-foreground'>
        &copy; 2024 - made by <Link href='https://inv3nt.dev'>inv3nt.dev</Link>
      </p>
    </footer>
  )
}

export default Footer
