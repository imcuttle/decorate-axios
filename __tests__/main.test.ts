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
      const dec = () => once(fn)

      dec()(axios)
      dec()(axios)

      expect(fn).toBeCalledTimes(1)
    }
  )
})
