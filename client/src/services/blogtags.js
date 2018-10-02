import * as baseService from './base';

function all() {
    return baseService.get('/api/blogs/blogtags');
}

function one(id) {
    return baseService.get(`/api/blogs/blogtags/${id}`);
}

function insert(data) {
    return baseService.post('/api/blogs/blogtags', data);
}

function destroy(id) {
    return baseService.destroy(`/api/blogs/blogtags/${id}`);
}

export { all, one, insert, destroy};