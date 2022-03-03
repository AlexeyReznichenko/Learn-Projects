export default function (context) {
    // if (!process.client) return;
    context.store.dispatch('initAuth', context.req);
}