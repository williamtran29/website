import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { up } from 'smooth-ui'
import { Link } from 'react-router-dom'
import { cl } from 'shared/cloudinary'
import Markdown from 'client/components/Markdown'

const PictureContainer = styled.div`
  text-align: center;
`

const Picture = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
`

const PictureLink = styled(Link)`
  display: inline-block;
  transition: transform 300ms;

  &:hover {
    transform: scale(1.05);
  }
`

const Infos = styled.div`
  margin: 20px 0 0;

  ${up(
    'md',
    css`
      margin: 0 0 0 30px;
    `,
  )};
`

const Name = styled.h4`
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  margin: 0 0 10px;
`

const TrainerCardComponent = ({ trainer, ...props }) => (
  <div {...props}>
    <PictureContainer>
      <PictureLink to={trainer.link}>
        <Picture
          width={150}
          height={150}
          src={cl(trainer.picture, 'dpr_2,c_fill,g_face,w_150,h_150')}
          alt={trainer.fullName}
        />
      </PictureLink>
    </PictureContainer>
    <Infos>
      <Link to={trainer.link}>
        <Name>{trainer.fullName}</Name>
      </Link>
      <Markdown source={trainer.description} />
    </Infos>
  </div>
)

const TrainerCard = styled(TrainerCardComponent)`
  display: flex;
  flex-direction: column;

  ${up(
    'md',
    css`
      flex-direction: row;
    `,
  )};
`

export const trainerCardFragment = gql`
  fragment TrainerCard on Trainer {
    link
    picture
    fullName
    description
  }
`

export default TrainerCard
