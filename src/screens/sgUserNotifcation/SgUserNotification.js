import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../components/navBar/NavBar';
import { Images } from '../../config';



const notificationData = [
    {
        id: 1,
        image: Images.bidsIcon,
        title: "7  Seater Sofa Set, By Terry",
        description : "Congratulations ! Your 2000 Bid has been accepted "
    },
    {
        id: 2,
        image: Images.notificationScreenImg,
        title: "DIY towel clean tip has been shared",
        description : "by Steve Anderson "
    },
    {
        id: 3,
        image: Images.notificationScreenImg,
        title: "DIY towel clean tip has been liked",
        description : "by Alexa Smith"
    },
    {
        id: 4,
        image: Images.redBidsIcon,
        title: "Kids Scotty By Jerry",
        description : "Your 1800 Bid has been declined. ",
        declined : true
    },
]

const renderNotification = ({item})=>{
    return(
        <View  style= {styles.flatlistContainer}>
            <View style={styles.imageContainer}>
            <Image source={item.image} />
            </View>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={[styles.description , item.declined && {color : "#FE130B"}]}>{item.description}</Text>
            </View>
        </View>
    )
}

export default function SgUserNotification() {
    return (
        <View style={styles.notificationContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"Notifications"} />
            </View>

<FlatList data={notificationData}
renderItem={renderNotification}
keyExtractor={(item) => item.id}
showsVerticalScrollIndicator={false}/>

        </View>
    );
}
