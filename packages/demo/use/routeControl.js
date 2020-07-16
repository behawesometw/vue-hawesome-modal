export default (getContext) => {

    const _pushRoute = (path) => {
        getContext().$router.push(path);
    }

    const onRouteMenuClick = (path) => {
        if (path !== getContext().$route.path) {
            _pushRoute(path)
        }
    }

    const updateRoute = (path) => {
        _pushRoute(path)
    }

    return { onRouteMenuClick, updateRoute }
}