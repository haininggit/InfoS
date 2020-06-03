package com.keshe.service.impl;

import com.keshe.entity.Forward;
import com.keshe.entity.Message;
import com.keshe.entity.RetJsonData;
import com.keshe.entity.User;
import com.keshe.mapper.ForwardMapper;
import com.keshe.service.ForwardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

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
    @Resource
    private MessageServiceImpl messageService;
    @Resource
    private UserServiceImpl userService;

    public ForwardServiceImpl() {
    }

    public List<Forward> getForwardOne(Forward forward) {
        return this.forwardMapper.getForwardOne(forward);
    }

    @Transactional
    public RetJsonData forward(Forward forward) {
        String result = "转发失败";
        if (this.getForwardOne(forward) == null) {
            int flag = this.forwardMapper.forward(forward);
            flag += this.messageService.forWardUpdateTranspondnum(forward);
            RetJsonData retJsonData = userService.queryUserId(forward.getUserId());
            User user = (User) retJsonData.getData();
            Message message = messageService.findMessageById(forward.getMessageId());
            String messagesInf = message.getMessageInfo();
            messagesInf = "@转发自:" + user.getUserName() + "\n" + messagesInf;
            message.setMessageInfo(messagesInf);
            message.setUserId(forward.getForwardId());
            flag += messageService.saveMessage(message);
            if (flag == 3) {
                result = "转发成功";
            }
        }
        return new RetJsonData(true, result, result);
    }
}
