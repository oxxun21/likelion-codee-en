import styled from "@emotion/styled";
import { Question_I, Bookmark_I } from "./../../interface";
import { useCookies } from "react-cookie";

interface TestDescSectionProps {
  descWidth?: number;
  question: Question_I | Bookmark_I;
}

export const TestDescSection = ({ descWidth, question }: TestDescSectionProps) => {
  const [cookies] = useCookies(["googtrans"]);
  const isGoogTransEn = cookies.googtrans === "/ko/en";

  return (
    <DescSection style={{ width: `${descWidth}%` }}>
      <DescArticle>
        <strong>문제 설명</strong>
        <p>{question?.script}</p>
      </DescArticle>
      <DescArticle>
        <strong>입력</strong>
        <p>{question?.input_condition}</p>
      </DescArticle>
      <DescArticle>
        <strong>출력</strong>
        <p>{question?.output_condition}</p>
      </DescArticle>
      <DescArticle>
        <strong>입출력 예</strong>
        <InputAndOutput className="notranslate">
          <div>
            <p>{isGoogTransEn ? "Exmaple Input 1" : "예제 입력 1"}</p>
            <p>{question?.input_1}</p>
          </div>
          <div>
            <p>{isGoogTransEn ? "Exmaple Output 1" : "예제 출력 1"}</p>
            <p>{question?.output_1}</p>
          </div>
          <div>
            <p>{isGoogTransEn ? "Exmaple Input 2" : "예제 입력 2"}</p>
            <p>{question?.input_2}</p>
          </div>
          <div>
            <p>{isGoogTransEn ? "Exmaple Output 2" : "예제 출력 2"}</p>
            <p>{question?.output_2}</p>
          </div>
        </InputAndOutput>
      </DescArticle>
    </DescSection>
  );
};

const DescSection = styled.section`
  padding: 22px;
  overflow: auto;
  height: 100%;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-button:vertical:start:decrement,
  ::-webkit-scrollbar-button:vertical:start:increment,
  ::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 15px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;
  }
  @media only screen and (max-width: 768px) {
    overflow: initial;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 0;
  }
`;

const DescArticle = styled.article`
  font-size: 12px;
  line-height: 2;
  margin-bottom: 40px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: var(--gray200-color);
  font-weight: 300;
  &:last-of-type {
    margin-bottom: 0;
  }
  & > strong {
    font-weight: 600;
    color: #989898;
    margin-bottom: 8px;
    display: block;
  }

  @media only screen and (max-width: 480px) {
    font-size: 16px;
    color: var(--black-color);
    line-height: 1.5;
    & > strong {
      font-size: 15px;
    }
  }
`;

const InputAndOutput = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.75rem;
  & > div {
    background-color: #2a2a31;
    border-radius: 6px;
    padding: 10px 1rem;
    & > p:first-of-type {
      font-size: 0.75rem;
      color: var(--gray400-color);
      @media only screen and (max-width: 480px) {
        margin-bottom: 8px;
      }
    }
    @media only screen and (max-width: 480px) {
      background-color: #fafafa;
      font-size: 0.875rem;
    }
  }
`;
