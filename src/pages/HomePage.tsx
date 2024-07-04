import { Badge, Container, Row} from "react-bootstrap"
import onlyjs from "../../src/assets/onlyjs.jpg";

const HomePage = () => {
  return (
    <>
    <Container>
    
   
    </Container>
    <Container>
    <h2 className="mt-5 bg-primary p-2 text-white" style={{ display: "inline-flex" }}>Home Page</h2>
      <Row className="mt-3">
        <div className="d-flex shadow-sm justify-content-around p-5">
          <div className="d-flex align-items-center">
            <h3><span className="text-muted fs-6" >FE-9733P - Ali Osman Taşın 'Mobil Developer'(Trainee), [OnlyJs]</span></h3>
          </div>
          <div className="text-center">
            <img src={onlyjs} style={{ width: "150px", height: "150px", borderRadius: "100%" }} alt="profile photo" />
          </div>
        </div>
      </Row>

      <Row className="mt-4 mx-auto">
        <div className="col-8">
        <p className=""> JSON Placeholder API Kullanarak React Web Uygulaması'nın Yapılması</p>
   
      <Badge className="m-1" bg="primary">React + Vite </Badge>
      <Badge className="m-1" bg="secondary">React - Bootstrap</Badge>
      <Badge className="m-1" bg="success">React Router Dom</Badge>
      <Badge className="m-1" bg="danger">Styled Component</Badge>
      <Badge className="m-1" bg="dark">Zustand</Badge>
      </div>
  
  <div>
    <h6 className="mt-2">Genel Özellikler</h6>
            <ul>
              <li><b>Kullanıcı Bilgileri:</b> API üzerinden kullanıcı bilgileri çekilir ve listelenir.</li>
              <li><b>Gönderiler ve Albümler:</b> Seçili kullanıcının gönderileri ve albümleri detaylı bir şekilde görüntülenir.</li>
              <li><b>Favoriler:</b> Kullanıcılar, istedikleri gönderileri ve albüm fotoğraflarını favorilere ekleyebilir ve favoriler sayfasında görüntüleyebilir.</li>
              <li><b>Global State Management:</b>Zustand kullanılarak favori içerikler global bir state içinde yönetilir ve local storage'da saklanır.</li>
            </ul>

  </div>
       
        
      </Row>




    </Container>
  </>
  )
}

export default HomePage