/**
 * Компонент модального окна для добавления или редактирования новости.
 * @param {boolean} isOpen - Определяет, открыто ли модальное окно.
 * @param {Function} onClose - Закрывает модальное окно.
 * @param {Function} onAddNews - Добавляет или обновляет новость.
 * @param {News | null} editingNews - Новость для редактирования (или null для создания новой).
 * @returns JSX.Element
 */
import { FC, useEffect, useCallback, memo } from "react";
import { Modal, Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { News } from "@typesProject";

interface NewsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNews: (news: News) => void;
  editingNews: News | null;
}

const NewsFormModal: FC<NewsFormModalProps> = memo(
  ({ isOpen, onClose, onAddNews, editingNews }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (editingNews) {
        form.setFieldsValue({
          title: editingNews.title,
          description: editingNews.content,
          imageUrl: editingNews.imageUrl,
        });
      } else {
        form.resetFields();
      }
    }, [editingNews, form]);

    const handleFinish = useCallback(
      (values: { title: string; description: string; imageUrl: string }) => {
        const newsData: News = {
          id: editingNews ? editingNews.id : uuidv4(),
          title: values.title,
          content: values.description,
          createdAt: editingNews ? editingNews.createdAt : new Date(),
          imageUrl: values.imageUrl,
        };

        onAddNews(newsData);
        form.resetFields();
        onClose();
      },
      [editingNews, onAddNews, form, onClose],
    );

    return (
      <Modal
        style={{ padding: "20px" }}
        title={editingNews ? "Редактировать новость" : "Добавить новость"}
        open={isOpen}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Заголовок"
            name="title"
            rules={[{ required: true, message: "Введите заголовок новости!" }]}
          >
            <Input
              placeholder="Введите заголовок"
              style={{ marginBottom: "10px" }}
            />
          </Form.Item>
          <Form.Item
            label="Краткое описание"
            name="description"
            rules={[{ required: true, message: "Введите краткое описание!" }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Введите краткое описание"
              style={{ marginBottom: "10px" }}
            />
          </Form.Item>
          <Form.Item
            label="URL фотографии"
            name="imageUrl"
            rules={[{ required: true, message: "Введите URL фотографии!" }]}
          >
            <Input
              placeholder="Введите URL фотографии"
              style={{ marginBottom: "10px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              {editingNews ? "Сохранить изменения" : "Добавить новость"}
            </Button>
            <Button type="default" onClick={onClose}>
              Отменить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default NewsFormModal;
