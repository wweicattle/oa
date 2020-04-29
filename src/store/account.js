

const state = {
    oa_token: window.localStorage.getItem("oa_token") || '',
    date: window.localStorage.getItem("oa_date") || ''
};

const getters = {
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
};
