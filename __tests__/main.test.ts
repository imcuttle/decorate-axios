/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
import {once} from '../src/_internal/once'
import axios from 'axios'

describe('decorateAxios', function() {
  it(
    'should spec',
    function () {
      const fn = jest.fn((axios) => {
      })
      const dec = () => once(fn, 'asdsa')

      dec()(axios)
      dec()(axios)

      const newAxios = axios.create()
      const remove = dec()(newAxios)
      dec()(newAxios)
      dec()(axios.create())

      expect(fn).toBeCalledTimes(3)

      remove()
      dec()(newAxios)
      expect(fn).toBeCalledTimes(4)
    }
  )
})
