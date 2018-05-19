import Vue from 'vue';
//全局 directive
export default Vue.directive('domscroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                el.removeEventListener('scroll', f)
            }
        }
        el.addEventListener('scroll', f)
    },
});