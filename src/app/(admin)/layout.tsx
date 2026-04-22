export const metadata = {
  title: ' YAANA Admin',
  description: 'Admin dashboard for  YAANA Livings',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
