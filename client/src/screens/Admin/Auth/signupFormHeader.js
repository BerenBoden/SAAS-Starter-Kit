import React from "react"
import styled from "styled-components"
import { colors, breakpoints } from "../../../styles/theme"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`

const Image = styled.img`
  height: 3rem;
  width: auto;
`

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  color: ${colors.gray900};
  text-align: center;
  font-weight: 800;
  font-size: 1.875rem;
  line-height: 2.25rem;
`

const AltText = styled.div`
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 2rem;
  color: ${colors.gray500};
`

const SignupFormHeader = () => (
  <Wrapper>
    <Image
      src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
      alt="Workflow"
    />
    <Title>Sign-Up for an Account</Title>

    <AltText>
      <Link to="/login">Already Have an Account? Login here</Link>
    </AltText>
  </Wrapper>
)

export default SignupFormHeader
