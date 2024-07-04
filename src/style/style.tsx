import styled from "styled-components";

const DivAlbum = styled.ul`
 box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const LiAlbum = styled.li`
    border-bottom: 1px solid #d0cfcf;
    padding: 10px;
    display: flex;
    justify-content: space-around;
`;


    const ImgAlbum = styled.img`
    width: 250px;
    height: 250px;
    object-fit: cover;
    `;

export {
    ImgAlbum,
    DivAlbum,
    LiAlbum,
};
