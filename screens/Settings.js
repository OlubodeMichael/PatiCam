import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Modal, TextInput } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { Ionicons } from '@expo/vector-icons';

function SettingScreen() {
    const authCtx = useContext(AuthContext);
    const userData = authCtx.userData;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        authCtx.logout();
    };

    const handleDeleteAccount = async () => {
        if (!password.trim()) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => setShowDeleteModal(false)
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await authCtx.deleteAccount(password);
                            setShowDeleteModal(false);
                            // The auth context should handle navigation after successful deletion
                        } catch (error) {
                            Alert.alert('Error', error.message || 'Failed to delete account');
                        } finally {
                            setIsLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {userData?.firstName?.[0]}{userData?.lastName?.[0]}
                        </Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>
                            {userData?.firstName} {userData?.lastName}
                        </Text>
                        <Text style={styles.userEmail}>{userData?.email}</Text>
                    </View>
                </View>

                {/* Settings Options */}
                <View style={styles.settingsContainer}>
                    {/* Account Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account Settings</Text>
                        <TouchableOpacity style={styles.option}>
                            <Ionicons name="person-outline" size={24} color="#333" />
                            <Text style={styles.optionText}>Edit Profile</Text>
                            <Ionicons name="chevron-forward" size={24} color="#ccc" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Ionicons name="lock-closed-outline" size={24} color="#333" />
                            <Text style={styles.optionText}>Change Password</Text>
                            <Ionicons name="chevron-forward" size={24} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    {/* App Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>App Settings</Text>
                        <TouchableOpacity style={styles.option}>
                            <Ionicons name="notifications-outline" size={24} color="#333" />
                            <Text style={styles.optionText}>Notifications</Text>
                            <Ionicons name="chevron-forward" size={24} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    {/* Danger Zone */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: '#FF3B30' }]}>Danger Zone</Text>
                        <TouchableOpacity 
                            style={[styles.option, styles.deleteOption]}
                            onPress={() => setShowDeleteModal(true)}
                        >
                            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                            <Text style={[styles.optionText, { color: '#FF3B30' }]}>Delete Account</Text>
                            <Ionicons name="chevron-forward" size={24} color="#FF3B30" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Logout Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                {/* Delete Account Modal */}
                <Modal
                    visible={showDeleteModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Delete Account</Text>
                            <Text style={styles.modalText}>
                                Please enter your password to confirm account deletion
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => {
                                        setShowDeleteModal(false);
                                        setPassword('');
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.deleteButton]}
                                    onPress={handleDeleteAccount}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.deleteButtonText}>
                                        {isLoading ? 'Deleting...' : 'Delete Account'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#3269F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    userEmail: {
        fontSize: 16,
        color: '#888888',
        marginTop: 4,
    },
    settingsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 15,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        marginLeft: 15,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEFEF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF3B30',
        marginLeft: 10,
    },
    deleteOption: {
        borderBottomWidth: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FF3B30',
    },
    modalText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#F2F2F2',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    cancelButtonText: {
        color: '#666',
        textAlign: 'center',
        fontWeight: '600',
    },
    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});
