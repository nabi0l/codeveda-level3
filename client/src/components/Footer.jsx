import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">Atelier Journal</span>
            <p className="footer-tagline">
              An independent design studio journal exploring interface craft, typography, and digital architecture.
            </p>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} Atelier Journal. All dispatches written by humans.
            </p>
            <p className="footer-credit">
              Crafted from our studio workbench • Built with React & Node
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
