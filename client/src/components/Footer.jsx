const Footer = () => {

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

  return (
      <footer className="absolute bottom-0 left-0 right-0 pt-4 text-center ">
          <p>{currentYear}-My College</p>
    </footer>
  )
}
export default Footer