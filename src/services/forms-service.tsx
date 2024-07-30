import apiClient from './api-client';

interface IFormInput {
    nickname: string;
    birthday: string;
    source: string;
    hobbies: string;
    tasks: string;
    experience: string;
    conflicts: string;
    memory: string;
    launcher: string;
    person: string;
}

export const submitFormData = async (formData: IFormInput, discordId) => {
    try {
        const response = await apiClient.post('/forms/submit', formData, {
            headers: {
                'discordId': discordId,
            },
        });

        if (response.status === 200) {
            console.log('Form submitted successfully:', response.data);
            return true;
        } else {
            console.error('Failed to submit form:', response.data.message);
        }
    } catch (error) {
        console.error('Error submitting form data:', error);
    }

    return false;
};

export const getForm = async (discordId) => {
    try {
        const response = await apiClient.get('/forms/retrieve', {
            headers: {
                'discordId': discordId,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to get form:', response.data.message);
        }
    } catch (error) {
        console.error('Error getting form:', error);
    }

    return null;
}

export const authForm = async (accessToken) => {
    try {
        const response = await apiClient.get('/forms/auth', {
            headers: {
                'authCode': accessToken,
            },
        });

        if (response.status === 200) {
            window.localStorage.setItem('discord_id', response.data.discordId);
        } else {
            console.error('Failed to get form:', response.data.message);
        }
    } catch (error) {
        console.error('Error getting form:', error);
    }
}

export const verifyUser = async (discordId) => {
    try {
        const response = await apiClient.get('/forms/verify', {
            headers: {
                'discordId': discordId,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to get form:', response.data.message);
        }
    } catch (error) {
        console.error('Error getting form:', error);
    }
}

