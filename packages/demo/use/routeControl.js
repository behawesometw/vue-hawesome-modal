export default (getContext) => {

    const that = getContext();

    const _pushRoute = (path) => {
        that.$router.push(path);
    }

    const onRouteMenuClick = (path) => {
        if (path !== that.$route.path) {
            _pushRoute(path)
        }
    }

    const updateRoute = (path) => {
        _pushRoute(path)
    }

    return { onRouteMenuClick, updateRoute }
}