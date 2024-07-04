import { Container } from "react-bootstrap"
import styled from "styled-components"

const FooterDiv = styled.div `

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(13 110 253);;
    
`


const Footer = () => {
  return (

    <>
    <Container>
     
     <FooterDiv>

        {/* <div className="text-center text-white p-3">
          <h5>Ali Osman Taşın - Mobil Devoleper Student</h5>
        </div> */}


     </FooterDiv>
   
    </Container>
  </>

  )
}

export default Footer