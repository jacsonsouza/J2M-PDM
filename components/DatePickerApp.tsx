import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import ButtonIcon from "./ButtonIcon";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerApp = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Selecione uma data");

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    var months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      months[tempDate.getUTCMonth()] +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.datePicker}>
      <TextInput style={styles.datePickerTextInput} value={text} />
      <ButtonIcon
        onPress={() => showMode("date")}
        icon={"calendar"}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerApp;

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: "row",
    margin: 10,
  },
  datePickerTextInput: {
    backgroundColor: "#fff",
    fontSize: 12,
    padding: 2,
    marginRight: 3,
    textAlign: "center",
    width: 200,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
