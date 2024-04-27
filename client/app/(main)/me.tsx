import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const me = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ padding: 16, gap: 24, paddingBottom: 46 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/019/896/012/non_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                }}
                style={{ width: 120, height: 120, borderRadius: 999 }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  backgroundColor: "white",
                  padding: 4,
                  borderRadius: 999,
                }}
              >
                <Feather name="edit-3" size={24} color="black" />
              </TouchableOpacity>
            </TouchableOpacity>

            <View style={{ marginTop: 10, alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#1F2024" }}
              >
                Le Vu Ngan Lam
              </Text>
              <Text style={{ fontSize: 16, color: "#1F2024" }}>
                nganlam0403@gmail.com
              </Text>
            </View>
          </View>
          {/* Section 1 */}
          <View style={styles.sectionContainerStyle}>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Feather name="package" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Feather name="book-open" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Addresses Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyle}>
              <Feather name="credit-card" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Payment Methods</Text>
            </TouchableOpacity>
          </View>
          {/* Section 2 */}
          <View style={styles.sectionContainerStyle}>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Feather name="edit" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Edit profile information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Ionicons name="notifications" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyle}>
              <Feather name="globe" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Language</Text>
            </TouchableOpacity>
          </View>

          {/* Section 3 */}
          <View style={styles.sectionContainerStyle}>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Feather name="lock" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyle}>
              <Feather name="moon" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Theme</Text>
            </TouchableOpacity>
          </View>

          {/* Section 4 */}
          <View style={styles.sectionContainerStyle}>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Feather name="help-circle" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyleWithBorder}>
              <Feather name="phone" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainerStyle}>
              <Feather name="lock" size={20} color="#1F2024" />
              <Text style={{ marginLeft: 10 }}>Privacy policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default me;

const styles = StyleSheet.create({
  sectionContainerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#A9A9A9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 1,
  },
  itemContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainerStyleWithBorder: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center",
  },
});
