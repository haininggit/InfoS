package com.keshe.service.impl;

import com.keshe.entity.Forward;
import com.keshe.entity.RetJsonData;
import com.keshe.mapper.ForwardMapper;
import com.keshe.service.ForwardService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @ClassName ForwardServiceImpl
 * @Description TODO
 * @Author Haining
 * @Date 2020/5/27 9:45
 * @Version 1.0
 */

@Service
public class ForwardServiceImpl implements ForwardService {
    @Resource
    private ForwardMapper forwardMapper;

    @Override
    public RetJsonData forward(Forward forward) {
        int flag=forwardMapper.forward(forward);
        String result="转发失败";
        if (flag>0)
            result="转发成功";
        return new RetJsonData(true,result,result );

    }
}
