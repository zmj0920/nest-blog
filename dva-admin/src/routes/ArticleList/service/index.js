import $$ from 'cmn-utils';

export async function articleType(payload) {
  return $$.get('articleType/find', payload);
}