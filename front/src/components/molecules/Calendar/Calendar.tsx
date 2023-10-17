import React, {useState} from "react"
import iconChevronLeftGrey from "@/assets/images/icon-chevron-left-grey.png"
import iconChevronRightGrey from "@/assets/images/icon-chevron-right-grey.png"
import { Image } from "@/components/atoms/Image/Image"
import { Text } from "@/components/atoms/Text/Text.styles"
import { CalenderWrapper } from "./Calendar.styles"
import iconCalender from "@/assets/images/icon-calendar.png"
import Button from "@/components/atoms/Button/Button";
import theme from "@/styles/theme";
import Modal from "@/components/atoms/Modal/Modal";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles"

type CalendarProps = {
    minusmonth: () => void;
    plusmonth: () => void;
    changemonth: (newMonth: number) => void;
    month: number;
  };

  const Calendar = (props: CalendarProps) => {
    const { minusmonth, plusmonth, changemonth } = props;
    const [isModalOpen, setModalOpen] = useState(false);
    const keypad = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월','10월', '11월', '12월'];
    const [selectedMonth, setSelectedMonth] = useState("");
    const numberButton = (string: string | "", index: number) => (
        <Button
          key={index}
          size="small"
          $fontSize="18px"
          onClick={() => handleMonthClick(string)}
          style={{
            width: "28%",
            height: "44px",
            fontWeight: "normal",
            backgroundColor: string === selectedMonth ? theme.color.white : theme.color.grey5,
            color: string === selectedMonth ? theme.color.blue : theme.color.grey2,
            marginBottom: "4px",
            border: string === selectedMonth ? `2px solid ${theme.color.blue}` : "none",
            pointerEvents: string === "11월" || string === "12월" ? "none" : "auto",
          }}
        >
          {string}
        </Button>
      );

    const toggleModal = () => {
        setModalOpen((prev) => !prev);
      };

    const handleMonthClick = (month: string) => {
        setSelectedMonth(month);
    };
    return (
        <CalenderWrapper>
            <Image onClick={minusmonth} src={iconChevronLeftGrey} width={24} height={24} $unit="px" />
            <div style={{display:"flex", alignItems:"center"}}>
                <Text size="body1" fontWeight="bold" color="black1" >
                    {props.month}월
                </Text>
                <Image onClick={toggleModal} src={iconCalender} width={20} height={20} $unit="px" $margin="0 0 0 8px" />
                {isModalOpen && (
                    <ModalBg onClick={toggleModal} style={{zIndex: "3"}}>
                    <Modal toggleModal={toggleModal}>
                        <Text
                        size="body2"
                        fontWeight="bold"
                        style={{
                        margin: "0 0 12px 12px"
                        }}
                        >
                        2023
                        </Text>
                        <Wrapper
                            $flexDirection="row"
                            $justifyContent="space-evenly"
                            style={{ marginBottom: "28px", gap: "10px", flexWrap: "wrap" }}
                        >
                            {keypad.slice(0, 13).map((btn, index) => {
                                return numberButton(btn, index);
                            })}
                        </Wrapper>
                        <div
                        style={{
                            padding: "0 4px 8px 4px"
                        }}
                        >
                            <Button
                            option="activated"
                            // onClick={() => {toggleModal(); {selectedMonth !== "" ? changemonth(parseInt(selectedMonth.slice(0, -1))) : props.month}}}
                            onClick={() => {
                                toggleModal();
                                // 수정된 부분: selectedMonth !== '11월' && selectedMonth !== '12월' 인 경우에만 changemonth 호출
                                if (selectedMonth !== '11월' && selectedMonth !== '12월') {
                                  changemonth(parseInt(selectedMonth.slice(0, -1)));
                                }
                              }}
                            >
                            확인
                            </Button>
                        </div>
                    </Modal>
                    </ModalBg>
                )}
            </div>
            <Image onClick={plusmonth} src={iconChevronRightGrey} width={24} height={24} $unit="px" />
        </CalenderWrapper>
    );
}

export default Calendar;
