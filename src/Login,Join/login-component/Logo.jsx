const Logo = () => (
  <div className="header"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <div className="logo-box" style={{width: '25%'}}>
      <img style={{ width: '100%' }} src="../images/tako.png" alt="로고"></img>
    </div>
    <div style={{
      whiteSpace: 'nowrap',
      fontSize: '200%',
      fontWeight: 'bold',
      color: '#FD5E53',
    }} className="logo-name">먹자취</div>
  </div>
);

export default Logo;