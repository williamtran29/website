import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import Markdown from 'modules/components/Markdown'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const PictureContainer = styled.div`text-align: center;`

const Picture = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
`

const PictureLink = styled(Link)`
  display: inline-block;
  transition: transform 300ms;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }
`

const Infos = styled.div`
  margin: 20px 0 0;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 0 0 30px;
  }
`

const Name = styled.h4`
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  margin: 0 0 10px;
`

const TrainerCard = ({ fullName, description, picture, link }) =>
  <Container>
    <PictureContainer>
      <PictureLink to={link}>
        <Picture
          width={150}
          height={150}
          src={clUrl(picture, 'dpr_2,c_fill,g_face,w_150,h_150')}
          alt={fullName}
        />
      </PictureLink>
    </PictureContainer>
    <Infos>
      <Link to={link}>
        <Name>
          {fullName}
        </Name>
      </Link>
      <Markdown source={description} />
    </Infos>
  </Container>

export default TrainerCard
