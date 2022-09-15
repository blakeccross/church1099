import { StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    //flex: 1,
  },
  userdp: {
    width: WP(15),
    height: WP(15),
    borderRadius: WP(20),
  },
  dp: {
    width: 50,
    height: 50,
    borderRadius: WP(6.5),
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "cover",
    backgroundColor: "#F4F4F5",
  },
  item: {
    width: "100%",
    height: HP(10),
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  infoContainer: {
    paddingLeft: 20,
    justifyContent: "space-between",
    width: WP(75),
  },
  userName: {
    fontFamily: fontFamily.light,
    fontSize: 18,
    color: palette.black,
    fontWeight: "600",
  },
  msgTxt: {
    fontFamily: fontFamily.bold,
    color: "black",
    fontSize: 22,
  },
  nameTxt: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: "black",
  },
  modalView: {
    backgroundColor: "white",
    flex: 0.8,
    borderRadius: 20,
    // position: 'absolute',
    width: "100%",
  },

  lastTxt: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    color: palette.lightGrey,
  },
  notFoundText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: palette.black,
    alignSelf: "center",
    textAlignVertical: "center",
    marginTop: "50%",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: HP(6),
    paddingHorizontal: WP(5),
  },
  headerTitleText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    textAlignVertical: "center",
  },
  searchBarContainer: {
    paddingHorizontal: WP(5),
    paddingBottom: HP(2),
    justifyContent: "space-between",
    backgroundColor: "#2b47fc",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "white",
    height: HP(5.5),
    width: WP(90),
    color: "white",
    fontSize: 13,
    paddingLeft: WP(3),
    textAlignVertical: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  searchText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: "white",
    textAlignVertical: "center",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: WP(0),
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
export default styles;
