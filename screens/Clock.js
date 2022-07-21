import React from "react";
import { Text, View } from "react-native";

const Clock = (props) => {
    const [date, setDate] = React.useState(new Date());
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    //Replaces componentDidMount and componentWillUnmount
    React.useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setDate(new Date());
    }

    return (
        <View style={{ flexDirection: 'row', margin: 5, borderBottomWidth: 2, borderColor: 'white' }}>
            <View style={{ marginRight: '45%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Date: {day + '-' + month + '-' + year}</Text>
            </View>
            <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Time: {date.toLocaleTimeString()}</Text>
            </View>
        </View>
    );
};

export default Clock